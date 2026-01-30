import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const LoginPage = () => {
    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Login</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    Login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                    <div>
                        <label className="mb-2 block">Email</label>
                        <Input type="email" placeholder="Email" />
                    </div>
                    <div>
                        <label className="mb-2 block">Password</label>
                        <Input type="password" placeholder="Password" />
                    </div>
                    <Button className="mt-4 w-full " type="submit">
                        Login
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default LoginPage;
