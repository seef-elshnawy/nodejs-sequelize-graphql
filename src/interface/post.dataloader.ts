import DataLoader from "dataloader";
import { User } from "../models/User";

export interface UserLoader {
  dataLoader: DataLoader<string, User>;
}
