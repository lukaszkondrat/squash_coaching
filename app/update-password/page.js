import UpdatePasswordForm from "../_components/UpdatePasswordForm";
import Image from "next/image";
import clubhouse from "@/public/clubhouse.jpeg"
import { Card } from "@mui/material";
import { PRIMARY_100 } from "../constants";

export default function UpdatePasswordPage() {
  return (
    <div className="flex items-center justify-center gap-16 text-primary-50">
      <Image src={clubhouse} fill placeholder="blur" className="object-cover blur-[2px] brightness-[0.6]" alt='A group of squash players posing for a photo in the clubhouse' />
      <div className="z-10 flex flex-col items-center justify-center mt-16">
        <Card sx={{
          p: 3,
          width: { xs: '20rem', sm: '24rem' },
          backgroundColor: PRIMARY_100,
        }}>
          <UpdatePasswordForm />
        </Card>
      </div>
    </div>
  );
} 