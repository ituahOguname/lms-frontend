import React, {FC, useEffect, useRef, useState} from 'react'
import { useToast } from '../../../components/ui/use-toast'
import { ShieldCheck } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from '../../../components/ui/card';
import { useSelector } from 'react-redux';
import { useActivationMutation } from '@/redux/features/auth/authApi';

interface Props {
    setRoute: (route: string) => void;
}

type VerifyNumber = {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
};

const Verification:FC<Props> = ({setRoute}) => {
    const {token} = useSelector((state:any) => state.auth);
    const [activation, {isSuccess, error}] = useActivationMutation();
    const[invalidError, setInvalidError] = useState<boolean>(false);
    const {toast} = useToast();

    useEffect(() => {
        if(isSuccess) {
            toast({
                title: "Account activated successfully"
            });
            setRoute("Login")
        }if(error) {
            if("data" in error) {
                const errorData = error as any
                toast({
                    variant: "destructive",
                    title: "Verification Error",
                    description: (errorData.data.message),
                })
                setInvalidError(true)
            } else {
                console.log("An error occurred", error);
                
            }
        }
    }, [isSuccess, error, toast, setRoute])
    

    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const [verifyNumber, setVeifyNumber] = useState<VerifyNumber>({
        0:"",
        1:"",
        2:"",
        3:"",
    })

    const verificationHandler = async() => {
        const verificationNumber =  Object.values(verifyNumber).join("");
        if(verificationNumber.length !== 4) {
            setInvalidError(true);
            return
        }
        await activation({
            activation_token: token,
            activation_code: verificationNumber,
        })
    }

    const handleInputChange = (index: number, value: string) =>{
        setInvalidError(false);
        const newVerifyNumber = {...verifyNumber, [index]: value}
        setVeifyNumber(newVerifyNumber)

        if(value === "" && index > 0){
            inputRefs[index - 1].current?.focus();
        } else if(value.length === 1 && index < 3){
            inputRefs[index + 1].current?.focus()
        }
    }

  return (
    <Card className="w-[500px] h-[500px]">
        <CardHeader className="space-y-2 items-center">
            <CardTitle className="text-3xl font-Poppins">Verify Your Account</CardTitle>
            <CardDescription>
                Type the code sent to your email address
            </CardDescription>
            
        </CardHeader>
        <CardContent>
        <div className='w-full flex justify-center items-center pb-8'>
            <ShieldCheck size={60}/>
        </div>
        <div className="flex m-auto items-center justify-around pb-6">
            {Object.keys(verifyNumber).map((key, index) => (
            <input
                type="number"
                key={key}
                ref={inputRefs[index]}
                className={`w-[50px] h-[50px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center 
                ${invalidError ? 'shake border-red-500' : 'dark:border-white border-[#0000004a]'}`}
                placeholder=""
                maxLength={1}
                value={verifyNumber[key as keyof VerifyNumber]}
                onChange={(e) => handleInputChange(index, e.target.value)}
            />
            ))}
        </div>
        </CardContent>
        <CardFooter className='flex justify-center items-center'>
            <Button type="submit" value="verify" className="w-[200px] text-[18px] font-Poppins" onClick={verificationHandler}>Verify OTP</Button>
        </CardFooter>
        <h5 className="pt-2 text-center font-Poppins">
            Go back to Log in?{" "}
            <span className="text-[#2190ff] pl-1 cursor-pointer" onClick={() => setRoute("Login")}>
                Log in
            </span>
        </h5>
    </Card>
  )
}

export default Verification