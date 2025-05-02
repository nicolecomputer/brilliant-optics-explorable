import "./header.css"

type HeaderProps = {
    title: string,
    children?: React.ReactNode
}
export default function Header({ children, title }: HeaderProps) {
    return (
        <header className="component-header">
            <h2>{title}</h2>

            {children && (
                <div className="component-header-controls">
                    {children}
                </div>
            )}
        </header>
    )
}
