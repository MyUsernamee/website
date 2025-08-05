import Page from "./[...slug]/page";

export default async function Root(){
    
    return Page({params: {
        slug: ["root"]
    }});
    
}
