import "./card.css"

import Card from "./Card"
import { CircleX } from "lucide-react"

type IconCardProps = {
    children: React.ReactNode
    icon: React.ReactNode,
    showRemove?: boolean,
    onRemove?: () => void
}

export default function IconCard({ children, icon, onRemove, showRemove }: IconCardProps) {
    return (
        <Card>
            <div className="icon-card-inner">
                <div className="icon">
                    {icon}
                </div>
                <div className="content">
                    {children}
                </div>
                {showRemove && (
                    <div className="remove">
                        <button className="icon-card-remove-button" onClick={onRemove}>
                            <CircleX />
                        </button>
                    </div>
                )}
            </div>
        </Card>
    )
}
