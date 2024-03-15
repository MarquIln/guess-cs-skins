'use client'
type HeaderProps = {
  name: string
}
export function Header({ name }: HeaderProps) {
  return (
    <header className="flex justify-center ">
      <div>
        <h2 className="text-center text-3xl font-semibold text-white">
          <span className="text-blue-500">{name}</span>
        </h2>
      </div>
    </header>
  );
}