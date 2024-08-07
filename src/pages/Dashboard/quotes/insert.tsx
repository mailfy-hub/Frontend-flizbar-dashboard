import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "../../../components/sectionTitle";
import { createQuotation } from "../../../client/quotations";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const QuotesInsert = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    quotationDate: Yup.date().required("Data da cotação é obrigatória"),
    dollar: Yup.number().required("Cotação do dólar é obrigatória"),
    euro: Yup.number().required("Cotação do euro é obrigatória"),
    yen: Yup.number().required("Cotação do yene é obrigatória"),
  });

  type FormValues = Yup.InferType<typeof validationSchema>;

  const initialValues: FormValues = {
    quotationDate: new Date(),
    dollar: 0,
    euro: 0,
    yen: 0,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handlePostCotation(values);
    },
  });

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const handlePostCotation = async (data: FormValues) => {

    await createQuotation(data)
      .then(() => {
        toast.success("Cotação adicionada com sucesso!")
        handleNavigateBack()
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <button onClick={handleNavigateBack} className="">
          <ArrowLeftIcon
            height={18}
            className="text-GRAY_400 hover:text-GOLD_DARK transition-all"
          />
        </button>
        <SectionTitle
          text={t("default.myAccount.admin.quotes.addQuoteForm.title")}
        />
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-12"
      >
        <div className="bg-WHITE p-8 w-full rounded-md">
          <div className="flex items-center gap-4">
            <Icon height={16} icon={"heroicons:chart-bar"} color="black" />
            <SectionTitle
              size="sm"
              text={t("default.myAccount.admin.quotes.addQuoteForm.subtitle")}
            />
          </div>
          <div className="mt-8 flex flex-col gap-6 ">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                type="date"
                label={t(
                  "default.myAccount.admin.quotes.addQuoteForm.dateOfQuote"
                )}
                id="quotationDate"
                name="quotationDate"
                value={formik.values.quotationDate.toString()}
                onChange={formik.handleChange}
                error={formik.touched.quotationDate && Boolean(formik.errors.quotationDate)}
              />
            </div>
          </div>
          <div className="mt-6">
            <SectionTitle
              size="sm"
              text={t(
                "default.myAccount.admin.comparativeValues.addComparativeValueForm.secondTitle"
              )}
            />
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <Input
                type="number"
                label="Dólar ($)" 
                id="dollar"
                name="dollar"
                value={formik.values.dollar}
                onChange={formik.handleChange}
                error={formik.touched.dollar && Boolean(formik.errors.dollar)}
              />
              <Input
                type="number"
                label="Euro (€)"
                id="euro"
                name="euro"
                value={formik.values.euro}
                onChange={formik.handleChange}
                error={formik.touched.euro && Boolean(formik.errors.euro)}
              />
              <Input
                type="number"
                label="Yene (¥)"
                id="yen"
                name="yen"
                value={formik.values.yen}
                onChange={formik.handleChange}
                error={formik.touched.yen && Boolean(formik.errors.yen)}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end mt-8">
          <Button type="submit" className="bg-GOLD_MAIN w-full md:w-auto">
            {t("default.myAccount.admin.quotes.addQuoteForm.buttonUpdateData")}
          </Button>
        </div>
      </form>
    </div>
  );
};
