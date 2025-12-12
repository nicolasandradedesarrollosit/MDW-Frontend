import { Button } from "@heroui/button";

type ButtonSizeProps = {
    size: string;
    onSelect: (size: string) => void;
    isSelected?: boolean;
    allowToggle?: boolean;
};

export default function ButtonSize({ size, onSelect, isSelected = false }: ButtonSizeProps) {
    const base = "uppercase px-3 py-1 rounded text-sm font-medium";
    const selectedClasses = "bg-black opacity-50 text-white border border-gray-300";
    const unselectedClasses = "bg-black text-white";

    return (
        <Button
            onPress={() => onSelect(size)}
            aria-pressed={isSelected}
            className={`${base} ${isSelected ? selectedClasses : unselectedClasses}`}
        >
            {size}
        </Button>
    );
}