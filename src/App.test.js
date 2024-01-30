import { render } from "@testing-library/react"
import {describe ,expect,it} from "vitest"
import App from "./App"



describe("app",()=>{
    it("chechk",()=>{
        render(<App/>)
    })
})