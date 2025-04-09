
export default function Wallet(props: any) {
  return (
    <>

    <div class="bg-white w-100 h-100">
      <p class="text-black">{props.name}</p>
      <p class="text-black">{props.balance}</p>
    </div>

    </>
  )
}

