type IconButtonProps = {
    children: React.ReactNode
}

export default function IconButton({ children }: IconButtonProps) {
    return (
        <button className="component-icon-button">
            {children}
        </button>
    )
}
