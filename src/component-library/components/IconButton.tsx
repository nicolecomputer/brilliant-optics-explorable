import "./icon-button.css"

type IconButtonProps = {
    children: React.ReactNode,
    onClick: () => void,
    disabled?: boolean
}

export default function IconButton({ children, onClick, disabled }: IconButtonProps) {
    return (
        <button className="component-icon-button" onClick={onClick} disabled={disabled ?? false}>
            {children}
        </button>
    )
}
