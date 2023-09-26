import { Request, Response } from "express";

const productController = {
    create : (req: Request, res: Response) => {
        return res.status(200).json("success");
    }
}

export default productController;