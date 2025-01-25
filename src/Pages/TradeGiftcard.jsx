import { Button } from "@chakra-ui/react"
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"

const GiftCardForm = () => {
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Open Dialog
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>
          We use cookies, by continuing to use this site you accept our use of cookies.  To learn more visit our  privacy policy.
Close

Slazzer logo
Use cases 
Tools & API
Unlimited cutouts
Pricing
appStore.svg
playStore.svg
Log in / Sign up
Upload an image to remove background
Upload Image
or drag and drop images
Paste image or Ctrl + V

No image?

Try one of these:





By uploading an image you hereby agree to our Terms of Service. This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.


Get updates
Sign up to our newsletter to receive information about new products, special offers and updates.
Email
This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
How to use
For Individuals
For Photographers
For Advertising
For Developers
For Car Dealers
For News & Media
For Ecommerce
For Enterprise
Tools & API
background removal API
Slazzer Infinity
On Premise
Slazzer for Zapier
Design Maker
Photoshop Plugin
Windows/Mac/Linux
Integrations, tools & app
Support
Contact Us
Help & FAQ
Refund Policy
Company
About Us
Blog
Footer Logo
Slazzer is an AI powered tool that uses advanced computer vision algorithms to remove bg from any image online and replace background automatically with the best detailing in just a few seconds.

appStore.svg
playStore.svg
en+".png"EN
All trademarks, service marks, trade names, product names, logos and trade dress appearing on our website are the property of their respective owners.

    
Terms of service
General Terms and Conditions
Privacy Policy
Copyright 2019-2024 NETFLAIRS TECHNOLOGY - All rights reserved.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button>Save</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}
export default GiftCardForm