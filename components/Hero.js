import ButtonSignin from "./ButtonSignin"

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-col items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div>
        <h1 className="text-5xl font-bold text-center">
          Simple Bento Grid Building in Minutes
        </h1>
        <p className="text-center mt-8 text-2xl text-gray-500"></p>
      </div>
      <ButtonSignin extraStyle="btn btn-wide bg-[#87D8F5] hover:bg-[#2fbbee] mx-auto" />
    </section>
  )
}

export default Hero
