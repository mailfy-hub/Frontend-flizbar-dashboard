import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { SectionTitle } from "../../../components/sectionTitle";
import { useTranslation } from "react-i18next";

type PeriodType = "days" | "weeks" | "months" | "years";

export const Calculator = () => {
  const { t } = useTranslation();

  const [initialValue, setInitialValue] = useState<number>(0);
  const [monthlyValue, setMonthlyValue] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [period, setPeriod] = useState<number>(0);
  const [periodType, setPeriodType] = useState<PeriodType>("months");
  const [result, setResult] = useState<string | null>(null);
  const [totalInvested, setTotalInvested] = useState<string | null>(null);
  const [totalInterest, setTotalInterest] = useState<string | null>(null);

  const handleInitialValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInitialValue(parseFloat(e.target.value));
  };

  const handleMonthlyValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMonthlyValue(parseFloat(e.target.value));
  };

  const handleInterestRateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInterestRate(parseFloat(e.target.value));
  };

  const handlePeriodChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPeriod(parseFloat(e.target.value));
  };

  const handlePeriodTypeChange = (value: PeriodType) => {
    setPeriodType(value);
  };

  const handleCalculate = () => {
    let months = period;
    if (periodType === "years") {
      months = period * 12;
    } else if (periodType === "weeks") {
      months = period / 4.345; // Aproximando semanas em meses
    } else if (periodType === "days") {
      months = period / 30.417; // Aproximando dias em meses
    }

    const monthlyInterestRate = interestRate / 100 / 12;
    let futureValue = initialValue;
    let totalMonthlyInvestments = 0;

    for (let i = 0; i < months; i++) {
      futureValue = (futureValue + monthlyValue) * (1 + monthlyInterestRate);
      totalMonthlyInvestments += monthlyValue;
    }

    const totalInvestedAmount = initialValue + totalMonthlyInvestments;
    const totalInterestEarned = futureValue - totalInvestedAmount;

    setResult(futureValue.toFixed(2));
    setTotalInvested(totalInvestedAmount.toFixed(2));
    setTotalInterest(totalInterestEarned.toFixed(2));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleCalculate();
  };

  const periodOfTimeMappedPortuguese =
    periodType == "days"
      ? "Dias"
      : periodType == "weeks"
      ? "Semanas"
      : periodType == "months"
      ? "Meses"
      : "Anos";

  return (
    <div>
      <div className="flex items-center gap-4">
        <SectionTitle
          text={t("default.myAccount.client.interestCalculator.title")}
        />
      </div>
      <form className="mt-12" onSubmit={handleSubmit}>
        <div className="bg-WHITE p-8 w-full rounded-md">
          <div className="flex items-center gap-4">
            <Icon height={16} icon={"heroicons:circle-stack"} color="black" />
            <SectionTitle
              size="sm"
              text={t(
                "default.myAccount.client.interestCalculator.secondaryTitle"
              )}
            />
          </div>
          <div className="mt-8 flex flex-col gap-6 ">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                type="number"
                label={t(
                  "default.myAccount.client.interestCalculator.initialValue"
                )}
                value={initialValue}
                onChange={handleInitialValueChange}
              />
              <Input
                type="number"
                label={t(
                  "default.myAccount.client.interestCalculator.monthlyValue"
                )}
                value={monthlyValue}
                onChange={handleMonthlyValueChange}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                type="number"
                label={t(
                  "default.myAccount.client.interestCalculator.interestRate"
                )}
                value={interestRate}
                onChange={handleInterestRateChange}
              />
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  className="w-full min-w-0"
                  type="number"
                  label={t(
                    "default.myAccount.client.interestCalculator.periodIn"
                  )}
                  value={period}
                  onChange={handlePeriodChange}
                />
                <Select
                  className="w-full min-w-0"
                  label={t(
                    "default.myAccount.client.interestCalculator.periodOfTime"
                  )}
                  value={periodType}
                  onChange={(e) => handlePeriodTypeChange(e as PeriodType)}
                >
                  <Option value="days">{t("default.periodOfTime.days")}</Option>
                  <Option value="weeks">
                    {t("default.periodOfTime.weeks")}
                  </Option>
                  <Option value="months">
                    {t("default.periodOfTime.months")}
                  </Option>
                  <Option value="years">
                    {t("default.periodOfTime.years")}
                  </Option>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end mt-8">
          <Button type="submit" className="bg-GOLD_MAIN w-full md:w-auto">
            {t("default.myAccount.client.interestCalculator.button")}
          </Button>
        </div>
      </form>
      <div className="mt-8">
        {result !== null && (
          <div className="mt-8 w-full rounded-md">
            <div className="flex flex-col gap-8">
              <div className="grid md:grid-cols-4 gap-8">
                <div className="w-full p-6 grid place-content-center bg-white rounded-lg">
                  <p>
                    <strong>
                      {t(
                        "default.myAccount.client.interestCalculator.initialValue"
                      )}
                      :
                    </strong>{" "}
                    R${initialValue.toFixed(2)}
                  </p>
                </div>
                <div className="w-full p-6 grid place-content-center bg-white rounded-lg">
                  <p>
                    <strong>
                      {t(
                        "default.myAccount.client.interestCalculator.monthlyValue"
                      )}
                      :
                    </strong>{" "}
                    R${monthlyValue.toFixed(2)}
                  </p>
                </div>
                <div className="w-full p-6 grid place-content-center bg-white rounded-lg">
                  <p>
                    <strong>
                      {t(
                        "default.myAccount.client.interestCalculator.interestRateSecondary"
                      )}
                      :
                    </strong>{" "}
                    {interestRate}%{" "}
                    {t("default.myAccount.client.interestCalculator.annual")}
                  </p>
                </div>
                <div className="w-full p-6 grid place-content-center bg-white rounded-lg">
                  <p>
                    <strong>
                      {t(
                        "default.myAccount.client.interestCalculator.periodIn"
                      )}
                      :
                    </strong>{" "}
                    {period} {periodOfTimeMappedPortuguese}
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="w-full p-6 grid place-content-center bg-white rounded-lg">
                  <p className="font-body text-BLACK text-body16">
                    {t(
                      "default.myAccount.client.interestCalculator.totalAmountInvested"
                    )}{" "}
                    <strong className="text-GOLD_MAIN font-display font-bold">
                      R${" "}
                    </strong>
                    {totalInvested}
                  </p>
                </div>
                <div className="w-full p-6 grid place-content-center bg-white rounded-lg">
                  <p className="font-body text-BLACK text-body16">
                    {t(
                      "default.myAccount.client.interestCalculator.totalInInterest"
                    )}{" "}
                    <strong className="text-GOLD_MAIN font-display font-bold">
                      R${" "}
                    </strong>
                    {totalInterest}
                  </p>
                </div>
                <div className="w-full p-6 grid place-content-center bg-GOLD_DARK rounded-lg">
                  <p className="font-body text-white text-body16">
                    {t(
                      "default.myAccount.client.interestCalculator.totalFinalAmount"
                    )}{" "}
                    <strong className="text-white font-display font-bold">
                      R${" "}
                    </strong>
                    {result}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
