import ButtonSignin from "./ButtonSignin"

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-col items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 bg-[#87D8F5] mb-4">
          AI To Help You Write Better
        </h1>
        <p className="text-2xl text-gray-500">
          Struggling with messy writing? Quick feedback improves clarity and
          helps create compelling writing over time.
        </p>
      </div>
      <div className="w-1/2 h-64 relative">
        <div className="absolute inset-0 bg-[#87D8F5] filter blur-3xl opacity-50 rounded-lg"></div>
        <iframe
          className="w-full h-full relative z-10 rounded-lg"
          src="https://www.youtube.com/embed/qaDL4go6UvY?rel=0&autoplay=1&mute=1"
          title="YouTube video player"
          allowFullScreen
          allow="autoplay"
        />
      </div>
      <ButtonSignin extraStyle="btn btn-wide bg-[#87D8F5] hover:bg-[#2fbbee] mx-auto" />
    </section>
  )
}

export default Hero
