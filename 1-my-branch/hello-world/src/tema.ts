
import * as wf from '@temporalio/workflow';



export async function unblockOrCancel(): Promise<void> {
    let toUpdate = false;
    let isLoginChangeBool = false
    let currentSettings = {
        toBookBeforeLfd: true,
        username: 'milan',
        password: 'kandel',
    }; //// some global settings
    wf.setHandler(updateSettings, () => {
        currentSettings.username = 'hello';
    }); // new
    wf.setHandler(isLoginChanged, () => {
        isLoginChangeBool=true
    }); // new




    const token = await login(currentSettings);
    console.log('here is token: ' + token);

    while (true) {

        const res = await getCurrentTimeStamp();
        if (res === false) break;

    }

    return;
}