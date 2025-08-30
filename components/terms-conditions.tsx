
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface TermsConditionsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TermsConditions({ open, onOpenChange }: TermsConditionsProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Terms & Conditions</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 text-sm">
          <section>
            <h3 className="text-lg font-semibold mb-2">1. Acceptance of Terms</h3>
            <p className="text-muted-foreground">
              By accessing and using Bankeru Games services, you accept and agree to be bound by 
              the terms and provision of this agreement.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">2. Use License</h3>
            <p className="text-muted-foreground">
              Permission is granted to temporarily use Bankeru Games services for personal, 
              non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">3. Disclaimer</h3>
            <p className="text-muted-foreground">
              The materials on Bankeru Games are provided on an 'as is' basis. Bankeru Games makes 
              no warranties, expressed or implied, and hereby disclaims and negates all other warranties.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">4. Limitations</h3>
            <p className="text-muted-foreground">
              In no event shall Bankeru Games or its suppliers be liable for any damages arising 
              out of the use or inability to use the materials on Bankeru Games' services.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">5. Account Responsibilities</h3>
            <p className="text-muted-foreground">
              You are responsible for maintaining the confidentiality of your account and password 
              and for restricting access to your computer or device.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">6. Modifications</h3>
            <p className="text-muted-foreground">
              Bankeru Games may revise these terms of service at any time without notice. 
              By using this service, you are agreeing to be bound by the current version of these terms.
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}
