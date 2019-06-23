import { notification } from 'antd'

const Notification = {
    error: data =>
        notification.error({
            message: 'Error',
            description: `${data}`,
        }),
    success: data =>
        notification.success({
            message: 'Success',
            description: `${data}`,
        }),
}

export default Notification
