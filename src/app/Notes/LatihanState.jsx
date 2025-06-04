"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
const NotesPage = () => {
    const [data, setData] = useState(String)
    const [input,setInput]=useState("");
    const HanddleClick=(data)=>{
        setData(data)
    }
    return (
        <div>
            <h1 className="text-2xl"> notes page
            </h1>
            <p className=" text-2xl mt-2">
                {`Isi State: `+data}
            </p>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Menampilkan state</CardTitle>
                    <CardDescription className="text-lg">Masukan data untuk menampilkannya di dalam state</CardDescription>
                </CardHeader>
                <CardContent>
                    <Label> Masukan data yang di input</Label>
                <Input onChange={(e)=>setInput(e.target.value)}></Input>
                </CardContent>
                <CardFooter className="flex gap-4">
                <Button onClick={() => HanddleClick(input)} className="text-2xl mt-2"> Masukan Data</Button>
                <Button onClick={() => setData("")} className="text-2xl ml-2 mt-2">Clear Data</Button>
                </CardFooter>
            </Card>
            

            
        </div>
    )
}
export default NotesPage;