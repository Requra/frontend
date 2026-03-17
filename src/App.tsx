import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";

function App() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-screen">
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
    </div>
  );
}

export default App;
