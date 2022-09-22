import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory

describe('Send forgot Mail', () => {


  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    mailProvider = new MailProviderInMemory()

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    )
  })

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail")

    await usersRepositoryInMemory.create({
      driver_license: "868251",
      email: "nofik@molitis.com",
      name: "Chester Bowers",
      password: "0102"
    });

    await sendForgotPasswordMailUseCase.execute("nofik@molitis.com")

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send a mail if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("saipric@ve.gi")
    ).rejects.toEqual(new AppError("User does not exists!"))
  });

  it("should be able to create an users token", async () => {
    const createToken = jest.spyOn(usersTokensRepositoryInMemory, "create")

    await usersRepositoryInMemory.create({
      driver_license: "568449",
      email: "nofik@molitis.com",
      name: "Chester Bowers",
      password: "0102"
    });

    await sendForgotPasswordMailUseCase.execute("nofik@molitis.com")

    expect(createToken).toHaveBeenCalled();
  });
})