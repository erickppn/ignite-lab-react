import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Link, useParams } from "react-router-dom";
import classNames from 'classnames';

interface LessonProps {
  title: string,
  slug: string,
  availableAt: Date,
  type: 'live' | 'class',
}

export function Lesson(props: LessonProps) {
  const { slug } = useParams<{ slug: string }>();

  const isLessonAvailable = isPast(props.availableAt);
  const availableDateFormatted = format(props.availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
    locale: ptBR,
  });

  const isActiveLesson = slug === props.slug;
  console.log(slug + ' / ' + props.slug)

  return (
    <Link 
      to={`/event/lesson/${props.slug}`} 
      className={classNames('group', {
        'pointer-events-none': !isLessonAvailable
      })}
    >
      <span className="text-gray-300">
        {availableDateFormatted}
      </span>
      
      <div 
        className={classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500', {
          'opacity-50': !isLessonAvailable,
          'bg-green-500 border-green-500 relative before:w-4 before:h-4 before:bg-green-500 before:absolute before:top-[calc(50%-8px)] before:rounded-sm before:rotate-45 before:-left-2': isActiveLesson,
        })}
      >
        <header className="flex justify-between items-center">
          {isLessonAvailable ? (
            <span className={classNames('flex items-center gap-2 text-sm font-medium', {
              'text-blue-500': !isActiveLesson,
              'text-white': isActiveLesson
            })}>
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="flex items-center gap-2 text-sm text-orange-500 font-medium">
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span className={classNames('text-xs rounded px-2 py-[0.125rem] text-white border  font-bold', {
            'border-green-300': !isActiveLesson,
            'border-white-300': isActiveLesson
          })}>
            {props.type == 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>

        <strong className={classNames('mt-5 block', {
          'text-gray-200': !isActiveLesson,
          'text-white': isActiveLesson
        })}>
          {props.title}
        </strong>
      </div>
    </Link>
  )
}