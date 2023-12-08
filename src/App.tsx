import { urlAPI } from './API/url'
import { FormContact } from './components'
export const App = () => {
    console.log(urlAPI)
    return (
        <>
            <main
                className="flex flex-col justify-center items-center min-h-screen"
            >
                <section
                    className="w-11/12 md:8-12 lg:w-5/12"
                >

                    <FormContact />

                </section>

            </main>
        </>
    )
}
