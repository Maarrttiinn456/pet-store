import { Link } from "react-router";
import { CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Card } from "./ui/card";

type BaseCardProps = {
    children: React.ReactNode;
    title: string;
    description: string;
    link?: string;
    linkText?: string;
};

const BaseCard = ({ title, description, children, link, linkText }: BaseCardProps) => {
    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">{title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    {description}
                    {link && (
                        <Link
                            to={link}
                            className="text-card-foreground underline underline-offset-2 hover:no-underline"
                        >
                            {linkText}
                        </Link>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
};

export default BaseCard;
