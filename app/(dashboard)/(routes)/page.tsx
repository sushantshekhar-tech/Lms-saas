
import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <div>
      <UserButton/>
      <SignInButton fallbackRedirectUrl="/" signUpFallbackRedirectUrl="/">
        Sign in
      </SignInButton>

      <SignUpButton signInFallbackRedirectUrl="/" fallbackRedirectUrl="/">
        Sign up
      </SignUpButton>
    </div>
  )
}
