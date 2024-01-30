import { render } from "@testing-library/react"
import {describe ,expect,it} from "vitest"
import App from "./App"
import Home from "./pages/Home/Home"



describe("app",()=>{
    it("chechk",()=>{
        render(<App/>)
    })
})