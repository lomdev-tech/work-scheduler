/**
 * 模态弹窗管理模块
 * Modal Management Module
 */

/**
 * 显示模态弹窗
 */
export function showModal(task = null) {
    const overlay = document.getElementById('modalOverlay');
    const form = document.getElementById('taskForm');
    const modalTitle = document.getElementById('modalTitle');
    const taskIdInput = document.getElementById('taskId');
    const taskNameInput = document.getElementById('taskName');
    const taskDateInput = document.getElementById('taskDate');
    const startTimeInput = document.getElementById('startTime');
    const endTimeInput = document.getElementById('endTime');
    const prioritySelect = document.getElementById('taskPriority');
    const descriptionInput = document.getElementById('taskDescription');
    
    // 设置标题
    modalTitle.textContent = task ? '编辑日程' : '新增日程';
    
    if (task) {
        // 编辑模式：填充表单
        taskIdInput.value = task.id;
        taskNameInput.value = task.name;
        taskDateInput.value = task.date;
        startTimeInput.value = task.startTime;
        endTimeInput.value = task.endTime;
        prioritySelect.value = task.priority;
        descriptionInput.value = task.description || '';
    } else {
        // 新增模式：清空表单并设置默认值
        form.reset();
        taskIdInput.value = '';
        
        // 设置默认日期为今天
        const today = new Date().toISOString().split('T')[0];
        taskDateInput.value = today;
        
        // 设置默认时间为当前时间的下一个整点
        const now = new Date();
        const nextHour = new Date(now);
        nextHour.setHours(now.getHours() + 1, 0, 0);
        const defaultTime = `${String(nextHour.getHours()).padStart(2, '0')}:00`;
        startTimeInput.value = defaultTime;
        
        // 设置结束时间为开始时间后1小时
        const endHour = new Date(nextHour);
        endHour.setHours(endHour.getHours() + 1);
        const defaultEndTime = `${String(endHour.getHours()).padStart(2, '0')}:00`;
        endTimeInput.value = defaultEndTime;
    }
    
    // 显示弹窗
    overlay.classList.add('active');
    
    // 聚焦到第一个输入框
    setTimeout(() => {
        taskNameInput.focus();
    }, 100);
}

/**
 * 隐藏模态弹窗
 */
export function hideModal() {
    const overlay = document.getElementById('modalOverlay');
    overlay.classList.remove('active');
    
    // 重置表单验证状态
    const form = document.getElementById('taskForm');
    form.classList.remove('was-validated');
}

/**
 * 初始化模态弹窗事件监听
 * @param {Function} onSubmit - 提交回调函数
 */
export function initModal(onSubmit) {
    const overlay = document.getElementById('modalOverlay');
    const form = document.getElementById('taskForm');
    const closeBtn = document.getElementById('modalClose');
    const cancelBtn = document.getElementById('cancelBtn');
    
    // 关闭按钮
    closeBtn.addEventListener('click', hideModal);
    cancelBtn.addEventListener('click', hideModal);
    
    // 点击遮罩层关闭
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            hideModal();
        }
    });
    
    // ESC 键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            hideModal();
        }
    });
    
    // 表单提交
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 获取表单数据
        const formData = {
            id: document.getElementById('taskId').value || null,
            name: document.getElementById('taskName').value.trim(),
            date: document.getElementById('taskDate').value,
            startTime: document.getElementById('startTime').value,
            endTime: document.getElementById('endTime').value,
            priority: document.getElementById('taskPriority').value,
            description: document.getElementById('taskDescription').value.trim()
        };
        
        // 验证时间范围
        if (formData.startTime >= formData.endTime) {
            alert('结束时间必须晚于开始时间！');
            return;
        }
        
        // 调用提交回调
        onSubmit(formData);
        
        // 关闭弹窗
        hideModal();
    });
}

