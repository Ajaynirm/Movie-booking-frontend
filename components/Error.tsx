import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

type AlertDemoProps = {
    content: string;
  };

export function AlertDemo({content}: AlertDemoProps) {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
     
     
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>{content}</AlertTitle>
        <AlertDescription>
          <p>Please verify below information and try again.</p>
          <ul className="list-inside list-disc text-sm">
            <li>Check your internet connection</li>
            <li>Backend might be disconnected</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  )
}
