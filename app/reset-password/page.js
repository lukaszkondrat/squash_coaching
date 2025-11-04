import ResetPasswordForm from "@/app/_components/ResetPasswordForm";
import { Card } from "@mui/material";
import { PRIMARY_100 } from "@/app/constants";

export default function ResetPasswordPage() {
  return (
    <div className="flex items-center justify-center gap-16 text-primary-50">
      <div className="z-10 flex flex-col items-center justify-center mt-16">
        <Card sx={{
          p: 3,
          width: { xs: '20rem', sm: '24rem' },
          backgroundColor: PRIMARY_100,
        }}>
          <ResetPasswordForm />
        </Card>
      </div>
    </div>
  );
} 