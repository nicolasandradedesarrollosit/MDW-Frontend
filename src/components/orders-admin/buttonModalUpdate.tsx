import { Button } from "@heroui/button";

export interface ButtonModalUpdateProps {
    value: string | null;
    selected?: boolean;
    onSelect?: (v: string | null) => void;
}

export default function ButtonModalUpdate({ value, selected, onSelect }: ButtonModalUpdateProps & { selected?: boolean, onSelect?: (v: string | null) => void }) {
    const handle = () => {
        onSelect && onSelect(value);
    };

    return (
        <Button
            color="default"
            className={`${selected ? 'opacity-70 ring-2 ring-white/20' : ''} select-none`}
            onPress={handle}
            variant="solid"
        >
            {value}
        </Button>
    );
}