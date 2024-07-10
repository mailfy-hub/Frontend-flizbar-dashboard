import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormStepType } from ".";
import { api } from "../../../client/api";
import { SectionTitle } from "../../../components/sectionTitle";

const ContractSchema = Yup.object().shape({
  terms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("Required"),
});

export const Contract = ({ handleConfirmationClick }: FormStepType) => {
  const formik = useFormik({
    initialValues: { terms: false },
    validationSchema: ContractSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (values.terms === false) return;
      try {
        await api.post("/profiles/accept-terms");
        handleConfirmationClick();
      } catch (error) {
        console.log(error);
      }
      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="bg-WHITE p-8 w-full rounded-md mt-8">
        <div className="flex items-center gap-4">
          <Icon height={16} icon={"heroicons:user"} color="black" />
          <SectionTitle size="sm" text="Contrato" />
        </div>
        <div className="mt-8">
          <Typography variant="h6" color="blue-gray">
            Termos e Condições de Uso da Flizbar
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            Bem-vindo à Flizbar! Ao se cadastrar, você concorda com os seguintes
            termos e condições de uso:
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            1. A Flizbar é uma plataforma de gerenciamento financeiro baseada em
            capital de mercado.
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            2. O usuário é responsável por manter a confidencialidade de sua
            senha e conta.
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            3. É proibido utilizar a plataforma para atividades ilegais ou não
            autorizadas.
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            4. A Flizbar se reserva o direito de encerrar contas que violem
            estes termos.
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            5. O uso contínuo da plataforma implica na aceitação de possíveis
            alterações nos termos.
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            6. A Flizbar não se responsabiliza por perdas financeiras
            decorrentes do uso da plataforma.
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            7. As informações fornecidas pelo usuário devem ser precisas e
            verdadeiras.
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            8. O usuário concorda em receber comunicações eletrônicas da
            Flizbar.
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            9. Todos os dados do usuário são tratados conforme a política de
            privacidade da Flizbar.
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            10. Em caso de dúvidas, entre em contato com nosso suporte.
          </Typography>
        </div>
        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            checked={formik.values.terms}
            className="mr-2"
          />
          <label
            htmlFor="terms"
            className="font-display text-BLACK text-body18"
          >
            Eu li e aceito os termos e condições de uso
          </label>
          {formik.touched.terms && formik.errors.terms ? (
            <div className="text-red-500 text-sm ml-2">
              {formik.errors.terms}
            </div>
          ) : null}
        </div>
      </div>

      <div className="w-full flex justify-end mt-8">
        <Button
          className="bg-GOLD_MAIN w-full md:w-auto"
          type="submit"
          disabled={formik.isSubmitting || !formik.values.terms}
        >
          Finalizar cadastro
        </Button>
      </div>
    </form>
  );
};
