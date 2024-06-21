import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IPet } from "@/interface/IPet"

import { PetDetails } from "@/routes/Pets/petDetails"
import { Badge } from "@/components/ui/badge"

export function PetDetailsDialog({id}: IPet) {
  return (
    <Dialog>
      <DialogTrigger asChild>
      <Badge className="cursor-pointer w-full items-center justify-center">Ver detalhes</Badge>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <PetDetails id={id} name={""} age={""} weight={""} coat={""}/>
      </DialogContent>
    </Dialog>
  )
}
