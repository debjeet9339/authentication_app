import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/signup" className="text-blue-500 hover:underline">
        Go to Signup Page
      </Link>
      <br />
      <Link href="/login" className="text-blue-500 hover:underline">
        Go to Login Page
      </Link>
    </>
  );
}
