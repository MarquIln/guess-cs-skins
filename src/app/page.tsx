import { CardSkin } from "@/components/CardSkin";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div className="flex flex-col justify-center">
      <Header name="Advinhe a skin do dia!"/>
      <CardSkin />
    </div>
  );
}
