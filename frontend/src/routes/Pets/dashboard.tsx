
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MyAdoptions } from "@/components/pets/myAdoptions";
import { MyPets } from "@/components/pets/myPets";

export function Dashboard() {  
  return(
    <div >
    <Tabs defaultValue="mypets" className="w-full ">
      <TabsList className="mb-5 justify-center ">
        <TabsTrigger value="mypets">Meus Pets</TabsTrigger>
        <TabsTrigger value="myadoptions">Minhas adoções</TabsTrigger>
      </TabsList>
     <TabsContent value="mypets" className="w-full ">
      <MyPets/>
      </TabsContent>
      <TabsContent value="myadoptions">
        <MyAdoptions/>
      </TabsContent>
    </Tabs>
    <Toaster richColors/>
   </div>
  )
}