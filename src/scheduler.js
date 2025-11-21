/**
 * 日程调度与时间冲突检测模块
 * Scheduler & Conflict Detection Module
 */

/**
 * 检测两个时间段是否冲突
 * @param {string} date1 - 日期1
 * @param {string} start1 - 开始时间1
 * @param {string} end1 - 结束时间1
 * @param {string} date2 - 日期2
 * @param {string} start2 - 开始时间2
 * @param {string} end2 - 结束时间2
 * @returns {boolean} 是否冲突
 */
function isTimeConflict(date1, start1, end1, date2, start2, end2) {
    // 不同日期不冲突
    if (date1 !== date2) {
        return false;
    }
    
    // 转换为分钟数便于比较
    const timeToMinutes = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };
    
    const start1Min = timeToMinutes(start1);
    const end1Min = timeToMinutes(end1);
    const start2Min = timeToMinutes(start2);
    const end2Min = timeToMinutes(end2);
    
    // 检查时间段是否重叠
    // 冲突条件：开始时间在另一个时间段内，或结束时间在另一个时间段内，或完全包含另一个时间段
    return !(end1Min <= start2Min || start1Min >= end2Min);
}

/**
 * 检测任务列表中的时间冲突
 * @param {Array} tasks - 任务列表
 * @returns {Array} 包含冲突信息的任务列表
 */
export function detectConflicts(tasks) {
    const tasksWithConflicts = tasks.map(task => ({
        ...task,
        conflicts: []
    }));
    
    // 对每个任务，检查与其他任务的冲突
    for (let i = 0; i < tasksWithConflicts.length; i++) {
        for (let j = i + 1; j < tasksWithConflicts.length; j++) {
            const task1 = tasksWithConflicts[i];
            const task2 = tasksWithConflicts[j];
            
            if (isTimeConflict(
                task1.date, task1.startTime, task1.endTime,
                task2.date, task2.startTime, task2.endTime
            )) {
                // 标记冲突
                task1.conflicts.push(task2.id);
                task2.conflicts.push(task1.id);
            }
        }
    }
    
    return tasksWithConflicts;
}

/**
 * 按日期和时间排序任务
 * @param {Array} tasks - 任务列表
 * @returns {Array} 排序后的任务列表
 */
export function sortTasks(tasks) {
    return [...tasks].sort((a, b) => {
        // 先按日期排序
        if (a.date !== b.date) {
            return a.date.localeCompare(b.date);
        }
        
        // 同一天按开始时间排序
        return a.startTime.localeCompare(b.startTime);
    });
}

/**
 * 过滤今日任务
 * @param {Array} tasks - 任务列表
 * @returns {Array} 今日任务列表
 */
export function filterTodayTasks(tasks) {
    const today = new Date().toISOString().split('T')[0];
    return tasks.filter(task => task.date === today);
}

/**
 * 过滤本周任务
 * @param {Array} tasks - 任务列表
 * @returns {Array} 本周任务列表
 */
export function filterWeekTasks(tasks) {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // 周日
    startOfWeek.setHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // 周六
    endOfWeek.setHours(23, 59, 59, 999);
    
    return tasks.filter(task => {
        const taskDate = new Date(task.date);
        return taskDate >= startOfWeek && taskDate <= endOfWeek;
    });
}

/**
 * 按日期过滤任务
 * @param {Array} tasks - 任务列表
 * @param {string} date - 日期 (YYYY-MM-DD)
 * @returns {Array} 指定日期的任务列表
 */
export function filterByDate(tasks, date) {
    return tasks.filter(task => task.date === date);
}

/**
 * 验证时间范围
 * @param {string} startTime - 开始时间
 * @param {string} endTime - 结束时间
 * @returns {boolean} 是否有效
 */
export function validateTimeRange(startTime, endTime) {
    const timeToMinutes = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };
    
    return timeToMinutes(endTime) > timeToMinutes(startTime);
}

/**
 * 检查新任务是否与现有任务冲突
 * @param {Array} existingTasks - 现有任务列表
 * @param {Object} newTask - 新任务（不包含ID或包含要排除的ID）
 * @returns {Array} 冲突的任务ID列表
 */
export function checkNewTaskConflicts(existingTasks, newTask) {
    const conflicts = [];
    
    existingTasks.forEach(task => {
        // 如果是编辑任务，排除自身
        if (newTask.id && task.id === newTask.id) {
            return;
        }
        
        if (isTimeConflict(
            newTask.date, newTask.startTime, newTask.endTime,
            task.date, task.startTime, task.endTime
        )) {
            conflicts.push(task.id);
        }
    });
    
    return conflicts;
}

