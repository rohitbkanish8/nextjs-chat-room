import { getServerSession } from 'next-auth';
import { Login } from './components/Buttons'
import { authOptions } from './lib/auth';
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/chat");
  }
  return (
    <div className='max-w-xl mx-auto border rounded-lg p-10 mt-32 flex flex-col justify-center items-center gap-4'>
      <h1 className='text-4xl text-center font-semibold '>Login to use chat!</h1>
        <Login />
    </div>
  )
}
