"use client";

import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});



const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId,setDeletingId] =useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Post request to add an attachment for the course
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Attachment Added Successfully");
      toggleEdit();
      router.refresh(); // Refreshes the page to get the updated list of attachments
    } catch (error) {
      toast.error("Something went wrong while uploading the file.");
      console.error(error);
    }
  };

  const onDelete = async (id:string)=>{
try{
setDeletingId(id);
await axios.delete(`/api/courses/${courseId}/attachments/${id}`)
toast.success("Attachments deleted");
router.refresh();
}catch{
toast.error("Something went wrong")
}finally{
  setDeletingId(null)
}
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Attachments
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add new File
            </>
          )}
        </Button>
      </div>

      {/* Display attachments or show message when none are present */}
      {!isEditing && (
        <>
          {(initialData?.attachments ?? []).length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No Attachments Yet
            </p>
          )}

          {initialData?.attachments && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin"/>
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button className="ml-auto hover:opacity-75 transition"
                    onClick={()=>{onDelete(attachment.id)}}
                    >
                      <X className="h-4 w-4 "/>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Edit mode to add a new attachment */}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything that your student might need to complete this course.
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
