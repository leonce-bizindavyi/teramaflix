import Title from '@/components/Title'
import Signup from '@/components/authentification/Signup'

function SignUpPage() {
  
   return (
    <>
    <Title title='SignUp' />
    <Signup />
    </>
   ) 
  }
export default SignUpPage
SignUpPage.getLayout = function pageLayout(page){
  return (
      <>
      {page}
      </>
  )
}