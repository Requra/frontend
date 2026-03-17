import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import { Mail, Eye, Globe, ArrowRight } from "lucide-react";

function App() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center my-10">
      <h1 className="font-bold underline text-gradient-primary text--heading">
        Requra.AI
      </h1>
      <h2 className="text-3xl font-bold underline text-gradient-steps">
        Requra.AI
      </h2>
      <div className="bg-gradient-primary p-8">
        <h2 className="text-3xl font-bold underline text-gradient-radial">
          Requra.AI
        </h2>
      </div>
      <div className="flex gap-4 justify-center items-center">
        <Button variant="default" size="default">
          Default
        </Button>
        <Button variant="outline" size="lg">
          Outline
        </Button>
        <Button variant="secondary" size="lg">
          Secondary
        </Button>
        <Button variant="ghost" size="lg">
          Ghost
        </Button>
        <Button variant="neutral" size="lg">
          Neutral
        </Button>
        <Button variant="dark" size="lg">
          Dark
        </Button>
        <Button variant="destructive" size="lg">
          Destructive
        </Button>
        <Button variant="link" size="lg">
          Link
        </Button>
        <Button variant="default" size="icon-lg" className="rounded-full mb-20">
          +
        </Button>
      </div>

      <div className="flex flex-col gap-4 w-1/2">
        <Input
          id="email"
          type="email"
          label="Email Address"
          placeholder="m@example.com"
          description="We'll never share your email with anyone else."
          required
        />
        <Input
          id="password"
          type="password"
          label="Password"
          error="Password must be at least 8 characters."
        />
        <Input type="email" placeholder="Email" startIcon={<Mail />} />
        <Input
          type="password"
          placeholder="Password"
          endIcon={<Eye className="cursor-pointer hover:text-foreground" />}
        />
        <Input
          type="text"
          label="Website"
          startIcon={<Globe />}
          endIcon={<ArrowRight />}
        />
      </div>
    </div>
  );
}

export default App;
