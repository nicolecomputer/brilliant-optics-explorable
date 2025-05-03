import "./card.css"

import Card from "./Card"

type IconCardProps = {
    children: React.ReactNode
    icon: React.ReactNode
}

export default function IconCard({ children, icon }: IconCardProps) {
    return (
        <Card>
            <div className="icon-card-inner">
                <div className="icon">
                    {icon}
                </div>
                {children}
            </div>
        </Card>
    )
}
