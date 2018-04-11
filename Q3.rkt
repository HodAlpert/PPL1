;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;COUNT-SYLLABLES;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(define syliter (lambda (list number flag)

                    (cond
                        ((empty? list) number)
                        ((firstCase? (car list) flag) (syliter (cdr list) number flag) );if we are in the middle of vowel and the current char is a vowel
                        ((secondCase? (car list) flag) (syliter (cdr list) (+ 1 number) #t));if we are not in the middle of vowel and current char is vowel
                        ((equal? flag #t) (syliter (cdr list) number #f ))
                        ((equal? #t #t) (syliter (cdr list) number flag)))))

(define isVowel?(lambda (char)(cond
                                  ((equal? char 'a) #t)
                                  ((equal? char 'e) #t)
                                  ((equal? char 'i) #t)
                                  ((equal? char 'o) #t)
                                  ((equal? char 'u) #t)
                                  (#t #f)
                                  )))
(define firstCase?(lambda (char flag)(
                                         and (isVowel? char)(equal? flag #t)
                                             )))
(define secondCase?(lambda (char flag)(
                                          and (isVowel? char)(equal? flag #f)
                                              )))

(define count-syllables (lambda (list)(syliter list 0 #f)))
'count-syllables-Test
(count-syllables '(s o a r i n u u u g o o o o o o t e t e t e))
(count-syllables '(b e e p))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;SORTED?;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(define sorted? (lambda (list f)
                    (cond
                        ((empty? list) #t);shoule return true because in the empty way- there is no two numbers that are not sorted according to the parameter
                        ((empty? (cdr list)) #t)
                        ((eq? #t #t)(and (f (car list) (cadr list)) (sorted? (cdr list) f) )
                        ))))
'sorted-Test (sorted? '(6 5 4 3) >)
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;MERGE;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(define merge (lambda (list1 list2)
                  (let
                          (
                              (continue_with_one_list (lambda (empty_list non_empty_list)(cons (car non_empty_list) (merge empty_list (cdr non_empty_list)))))
                              (continue_with_two_lists (lambda (bigger smaller)(cons (car smaller) (merge bigger (cdr smaller)))))
                          )
                      (cond
                          ((and (empty? list1) (empty? list2)) '())
                          ((empty? list1) (continue_with_one_list list1 list2))
                          ((empty? list2) (continue_with_one_list list2 list1))
                          ((> (car list1) (car list2)) (continue_with_two_lists list1 list2))
                          ((eq? #t #t) (continue_with_two_lists list2 list1))
                          ))))
'merge-Test
(merge '(4 5 6) '(1 2 3))
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;ERMOVE-ADJACENT-DUPLICATES;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
(define remove-adjacent-duplicates (lambda (lst) (cond
                                                     ((empty? lst) '())
                                                     ((empty? (cdr lst)) lst)
                                                     ((eq? (car lst) (cadr lst)) (remove-adjacent-duplicates (cons (car lst) (cddr lst))))
                                                     ((eq? #t #t) (cons (car lst) (remove-adjacent-duplicates (cdr lst))))
                                                     )))
'remove-adjacent-duplicates-Test
(remove-adjacent-duplicates '(y a b b a d a b b a d o o))
