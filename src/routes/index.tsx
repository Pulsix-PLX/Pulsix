import Card from "./(Pages)/Wallets/_components/Card3D";

export default  function index() {
  return (
    <>
    <div class='flex flex-row'>
    <Card color={'purple'} balance="4000" wallet="revolut"/>
    <Card color={'black'} balance="2000" wallet="ash"/>
    </div>
    </>
  )
}

