import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';

import { RootState } from '@/store';
import Button from '@/components/common/Button';
import TextInput from '@/components/common/TextInput';

type CreateAdminDialogProps = {
  isOpen: boolean;
  closeDialog: () => void;
  createAdminMutation: any;
};

const CreateAdminDialog = ({
  isOpen,
  closeDialog,
  createAdminMutation,
}: CreateAdminDialogProps) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [formValues, setFormValues] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
  });

  useEffect(() => {
    if (isOpen) {
      setFormValues({
        fullName: '',
        phoneNumber: '',
        email: '',
      });
      setErrors({
        fullName: '',
        phoneNumber: '',
        email: '',
      });
    }
  }, [isOpen]);

  const validateFormValues = () => {
    const { fullName, email, phoneNumber } = formValues;
    const formErrors = { ...errors };
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if (!fullName.trim()) {
      formErrors.fullName = 'Họ và tên không được để trống.';
    } else {
      formErrors.fullName = '';
    }

    if (!email.trim()) {
      formErrors.email = 'Địa chỉ email không được để trống.';
    } else if (!emailRegex.test(email)) {
      formErrors.email = 'Địa chỉ email không hợp lệ.';
    } else {
      formErrors.email = '';
    }

    if (!phoneNumber.trim()) {
      formErrors.phoneNumber = 'Số điện thoại không được để trống.';
    } else if (!phoneRegex.test(phoneNumber)) {
      formErrors.phoneNumber = 'Số điện thoại không hợp lệ.';
    } else {
      formErrors.phoneNumber = '';
    }

    return formErrors;
  };

  const handleSubmit = async () => {
    const formErrors = validateFormValues();
    console.log('Form values:', formValues);
    console.log('Form errors:', formErrors);

    if (!Object.values(formErrors).some(error => error)) {
      try {
        await createAdminMutation.mutateAsync({
          fullName: formValues.fullName,
          phoneNumber: formValues.phoneNumber,
          email: formValues.email,
        });
        closeDialog();
        setFormValues({
          fullName: '',
          phoneNumber: '',
          email: '',
        });
      } catch (error) {
        console.error('Submit error:', error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <DialogContent className="max-w-[800px] bg-white">
      <DialogHeader>
        <DialogTitle>Thêm nhân viên</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <div className="border-b-2"></div>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="mb-10">
              <TextInput
                fieldName="fullName"
                placeholder="Họ và tên"
                error={errors.fullName}
                value={formValues.fullName}
                onChange={(value: string) =>
                  setFormValues(prev => ({ ...prev, fullName: value }))
                }
                onFocus={() =>
                  setErrors(prev => ({ ...prev, fullName: '' }))
                }
                labelClassName="bg-white"
              />
            </div>
            <div className="mb-10">
              <TextInput
                fieldName="email"
                placeholder="Email"
                error={errors.email}
                value={formValues.email}
                onChange={(value: string) =>
                  setFormValues(prev => ({ ...prev, email: value }))
                }
                onFocus={() =>
                  setErrors(prev => ({ ...prev, email: '' }))
                }
                labelClassName="bg-white"
              />
            </div>
            <div className="mb-5">
              <TextInput
                fieldName="phoneNumber"
                placeholder="Số điện thoại"
                error={errors.phoneNumber}
                value={formValues.phoneNumber}
                onChange={(value: string) =>
                  setFormValues(prev => ({ ...prev, phoneNumber: value }))
                }
                onFocus={() =>
                  setErrors(prev => ({ ...prev, phoneNumber: '' }))
                }
                labelClassName="bg-white"
              />
            </div>
          </div>
          <div>
            <div className="mb-5">
              <TextInput
                fieldName="createdBy"
                placeholder="Người tạo"
                error=""
                disabled={true}
                value={user?.fullName ?? ''}
                onChange={() => {}}
                onFocus={() => {}}
                labelClassName="bg-white"
              />
            </div>
          </div>
        </div>
        <div className="border-b-2"></div>
        <DialogFooter>
          <Button text="Hủy bỏ" variant="danger" onClick={closeDialog} />
          <Button text="Xác nhận" variant="success" onClick={handleSubmit} />
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default CreateAdminDialog;