import { ref } from 'vue';

const FIRST_VISIT_KEY = 'seen-welcome-ann';

export function useFirstVisit() {
  const isFirstVisit = ref(true);

  const checkFirstVisit = () => {
    const visited = localStorage.getItem(FIRST_VISIT_KEY);
    isFirstVisit.value = !visited;
    
    if (!visited) {
      localStorage.setItem(FIRST_VISIT_KEY, 'true');
    }
  };

  return {
    isFirstVisit,
    checkFirstVisit
  };
}