import React from 'react'

const CourseIdPage = ({
    params
}:{
    params:{courseId:string}
}) => {
  return (
    <div>
      CourseId page with courseid {params.courseId}
    </div>
  )
}

export default CourseIdPage;
