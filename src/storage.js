/**
 * 本地存储管理模块
 * LocalStorage Management Module
 */

const STORAGE_KEY = 'work_scheduler_tasks';

/**
 * 获取所有任务
 * @returns {Array} 任务列表
 */
export function getAllTasks() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) {
            // 首次使用，返回示例数据
            return getDefaultTasks();
        }
        return JSON.parse(data);
    } catch (error) {
        console.error('读取任务数据失败:', error);
        return [];
    }
}

/**
 * 保存所有任务
 * @param {Array} tasks - 任务列表
 */
export function saveAllTasks(tasks) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        return true;
    } catch (error) {
        console.error('保存任务数据失败:', error);
        return false;
    }
}

/**
 * 添加新任务
 * @param {Object} task - 任务对象
 * @returns {Object} 添加的任务（包含生成的ID）
 */
export function addTask(task) {
    const tasks = getAllTasks();
    const newTask = {
        ...task,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    tasks.push(newTask);
    saveAllTasks(tasks);
    return newTask;
}

/**
 * 更新任务
 * @param {string} id - 任务ID
 * @param {Object} updates - 更新的字段
 * @returns {Object|null} 更新后的任务，失败返回null
 */
export function updateTask(id, updates) {
    const tasks = getAllTasks();
    const index = tasks.findIndex(task => task.id === id);
    
    if (index === -1) {
        return null;
    }
    
    tasks[index] = {
        ...tasks[index],
        ...updates,
        updatedAt: new Date().toISOString()
    };
    
    saveAllTasks(tasks);
    return tasks[index];
}

/**
 * 删除任务
 * @param {string} id - 任务ID
 * @returns {boolean} 是否删除成功
 */
export function deleteTask(id) {
    const tasks = getAllTasks();
    const filteredTasks = tasks.filter(task => task.id !== id);
    
    if (filteredTasks.length === tasks.length) {
        return false; // 未找到任务
    }
    
    saveAllTasks(filteredTasks);
    return true;
}

/**
 * 根据ID获取任务
 * @param {string} id - 任务ID
 * @returns {Object|null} 任务对象，不存在返回null
 */
export function getTaskById(id) {
    const tasks = getAllTasks();
    return tasks.find(task => task.id === id) || null;
}

/**
 * 生成唯一ID
 * @returns {string} 唯一ID
 */
function generateId() {
    return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 获取默认示例数据
 * @returns {Array} 示例任务列表
 */
function getDefaultTasks() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };
    
    const defaultTasks = [
        {
            id: generateId(),
            name: '团队周会',
            date: formatDate(today),
            startTime: '09:00',
            endTime: '10:00',
            priority: 'P1',
            description: '每周团队同步会议，讨论项目进展',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: generateId(),
            name: '代码审查',
            date: formatDate(today),
            startTime: '14:00',
            endTime: '15:30',
            priority: 'P2',
            description: 'Review 新功能 PR',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: generateId(),
            name: '项目规划',
            date: formatDate(tomorrow),
            startTime: '10:00',
            endTime: '12:00',
            priority: 'P1',
            description: '制定下季度项目计划',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    ];
    
    // 保存示例数据
    saveAllTasks(defaultTasks);
    return defaultTasks;
}

/**
 * 清空所有任务（用于测试或重置）
 */
export function clearAllTasks() {
    localStorage.removeItem(STORAGE_KEY);
}

