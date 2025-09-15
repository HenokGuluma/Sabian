
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface PrivacyPolicyProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PrivacyPolicy({ open, onOpenChange }: PrivacyPolicyProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Privacy Policy</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 text-sm">
          <section>
            <h3 className="text-lg font-semibold mb-2">1. Information We Collect</h3>
            <p className="text-muted-foreground">
              We collect information you provide directly to us, such as when you create an account, 
              use our services, or contact us for support. This may include your name, email address, 
              and usage data related to your gaming activities.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">2. How We Use Your Information</h3>
            <p className="text-muted-foreground">
              We use the information we collect to provide, maintain, and improve our services, 
              process transactions, send communications, and comply with legal obligations.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">3. Information Sharing</h3>
            <p className="text-muted-foreground">
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this policy or as required by law.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">4. Data Security</h3>
            <p className="text-muted-foreground">
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">5. Your Rights</h3>
            <p className="text-muted-foreground">
              You have the right to access, update, or delete your personal information. You may also 
              opt out of certain communications from us.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">6. Contact Us</h3>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at info@zemenconsole.com.
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}
