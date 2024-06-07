import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  return (
    <div className="bg-gray-100 flex items-center py-20 justify-between">
      <div className="text-wrap">
        <p className="text-4xl font-bold mb-4">Join Our Newsletter </p>
        <p className="text-lg mb-6">
          We love to surprise our subscribers with occasional gifts..
        </p>
      </div>
      <div className="flex gap-4 items-center">
        <Input
          type="email"
          placeholder="Your email address"
          className="bg-gray-100 pr-36"
        />
        <Button className="inline-flex items-center bg-black text-white px-6 py-2 rounded-lg">
          Subscribe
        </Button>
      </div>
    </div>
  );
}
