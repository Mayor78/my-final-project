const backendDomin = "http://localhost:8080"



const  SummaryApi ={
    signUp :{
        url : `${backendDomin}/api/signup`,
        method : "POST",
    },
    signIn :{
        url : `${backendDomin}/api/signin`,
        method : "POST",
    },
    current_user :{
        url :`${backendDomin}/api/user-detailss`,
        method : "GET",
    }
}

export default SummaryApi;