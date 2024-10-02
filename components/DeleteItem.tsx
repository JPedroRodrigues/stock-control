import { Trash2 } from "lucide-react";
import { useState } from "react";

export function DeleteItem() {
    const [color, setColor] = useState("#545454");

    function onColorChange() {
        setColor("#ff1a1a"); 
    }

    function onColorChangeDefault() {
        setColor("#545454")
    }

    return (
        <Trash2 className="h-5" color={color} onMouseEnter={onColorChange} onMouseLeave={onColorChangeDefault}></Trash2>
    )
}